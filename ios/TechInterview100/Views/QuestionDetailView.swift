import SwiftUI
import SwiftData

struct QuestionDetailView: View {
    let question: Question
    @EnvironmentObject var appState: AppState
    @Environment(\.modelContext) private var modelContext

    @Query private var allRecords: [QuestionRecord]

    @State private var recallText: String = ""
    @State private var showAnswer: Bool = false
    @State private var expandedFollowUps: Set<Int> = []
    @State private var showTrapExplanation: Bool = false
    @State private var toastMessage: String = ""
    @State private var showToast: Bool = false
    @State private var didLoad: Bool = false

    private var record: QuestionRecord? {
        allRecords.first { $0.questionId == question.id }
    }

    private var currentStatus: QuestionStatus? {
        record?.questionStatus
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                questionHeader

                Divider()

                // Stage 1: Blank Recall
                stage1View
                    .padding(.horizontal, 16)
                    .padding(.top, 20)

                if showAnswer {
                    stageDivider
                    stage2View
                        .padding(.horizontal, 16)
                        .padding(.top, 20)

                    stageDivider
                    stage3View
                        .padding(.horizontal, 16)
                        .padding(.top, 20)

                    stageDivider
                    stage4View
                        .padding(.horizontal, 16)
                        .padding(.top, 20)

                    stageDivider
                    stage5View
                        .padding(.horizontal, 16)
                        .padding(.top, 20)
                        .padding(.bottom, 40)
                }
            }
        }
        .navigationTitle(String(format: "%02d", question.id))
        .navigationBarTitleDisplayMode(.inline)
        .overlay(alignment: .bottom) {
            if showToast {
                ToastView(message: toastMessage)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                    .padding(.bottom, 20)
            }
        }
        .animation(.easeInOut(duration: 0.25), value: showToast)
        .onAppear { loadFromRecord() }
        .onChange(of: allRecords) { _, _ in
            if !didLoad { loadFromRecord() }
        }
        .onDisappear { saveRecall() }
    }

    // MARK: - Question header

    private var questionHeader: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                Text(question.cat)
                    .font(.caption.bold())
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.accentColor.opacity(0.12))
                    .foregroundStyle(Color.accentColor)
                    .clipShape(Capsule())

                if let status = currentStatus {
                    Text(status.icon)
                        .font(.caption)
                }
                Spacer()
            }

            Text(question.q)
                .font(.body.weight(.medium))
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 16)
    }

    // MARK: - Stage 1: Blank Recall

    private var stage1View: some View {
        VStack(alignment: .leading, spacing: 12) {
            stageLabel(appState.stage1Label, color: .accentColor)

            Text(appState.stage1Prompt)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            // TextEditor with placeholder overlay
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color(.systemGray6))
                    .frame(minHeight: 120)

                if recallText.isEmpty {
                    Text(appState.stage1Placeholder)
                        .foregroundStyle(Color(.placeholderText))
                        .font(.body)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 12)
                        .allowsHitTesting(false)
                }

                TextEditor(text: $recallText)
                    .font(.body)
                    .frame(minHeight: 120)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 6)
                    .scrollContentBackground(.hidden)
                    .background(Color.clear)
                    .opacity(showAnswer ? 0.6 : 1.0)
                    .disabled(showAnswer)
                    .onChange(of: recallText) { _, _ in autoSaveRecall() }
            }

            if !showAnswer {
                Button {
                    saveRecall()
                    withAnimation(.easeInOut(duration: 0.3)) { showAnswer = true }
                } label: {
                    Text(appState.revealBtnLabel)
                        .font(.subheadline.bold())
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Color.accentColor)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }
                .buttonStyle(.plain)
            }
        }
    }

    // MARK: - Stage 2: Model Answer

    private var stage2View: some View {
        VStack(alignment: .leading, spacing: 12) {
            stageLabel(appState.stage2Label, color: .accentColor)

            HTMLText(html: question.a)
                .font(.body)
                .lineSpacing(4)

            if !question.links.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    ForEach(question.links, id: \.u) { link in
                        if let url = URL(string: link.u) {
                            Link(destination: url) {
                                HStack(spacing: 4) {
                                    Image(systemName: "arrow.up.right.square")
                                        .font(.caption)
                                    Text(link.t)
                                        .font(.subheadline)
                                        .underline()
                                }
                                .foregroundStyle(Color.accentColor)
                            }
                        }
                    }
                }
                .padding(.top, 4)
            }
        }
    }

    // MARK: - Stage 3: Self Assessment

    private var stage3View: some View {
        VStack(alignment: .leading, spacing: 12) {
            stageLabel(appState.stage3Label, color: .accentColor)

            Text(appState.stage3Subtitle)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            VStack(spacing: 8) {
                AssessButton(title: appState.assessUnknown,  status: .unknown,  isSelected: currentStatus == .unknown)  { assess(.unknown) }
                AssessButton(title: appState.assessPartial,  status: .partial,  isSelected: currentStatus == .partial)  { assess(.partial) }
                AssessButton(title: appState.assessMastered, status: .mastered, isSelected: currentStatus == .mastered) { assess(.mastered) }
            }
        }
    }

    // MARK: - Stage 4: Follow-up Questions

    private var stage4View: some View {
        VStack(alignment: .leading, spacing: 12) {
            stageLabel(appState.stage4Label, color: .accentColor)

            VStack(spacing: 0) {
                ForEach(Array(question.fqs.enumerated()), id: \.offset) { idx, fq in
                    FollowUpRow(fq: fq, isExpanded: expandedFollowUps.contains(idx)) {
                        withAnimation(.easeInOut(duration: 0.2)) {
                            if expandedFollowUps.contains(idx) { expandedFollowUps.remove(idx) }
                            else { expandedFollowUps.insert(idx) }
                        }
                    }
                    if idx < question.fqs.count - 1 {
                        Divider().padding(.leading, 14)
                    }
                }
            }
            .background(Color(.systemGray6))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }

    // MARK: - Stage 5: Trap

    private var stage5View: some View {
        VStack(alignment: .leading, spacing: 12) {
            stageLabel(appState.stage5Label, color: .red)

            Text(appState.trapPrompt)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            HTMLText(html: question.trap.wrong)
                .font(.body)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.red.opacity(0.08))
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.red.opacity(0.2)))

            if showTrapExplanation {
                HTMLText(html: question.trap.explain)
                    .font(.body)
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.green.opacity(0.08))
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(Color.green.opacity(0.2)))
                    .transition(.opacity.combined(with: .move(edge: .top)))
            } else {
                Button {
                    withAnimation(.easeInOut(duration: 0.25)) { showTrapExplanation = true }
                } label: {
                    Text(appState.trapBtnLabel)
                        .font(.subheadline.bold())
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(Color(.systemGray5))
                        .foregroundStyle(Color.primary)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }
                .buttonStyle(.plain)
            }
        }
    }

    // MARK: - Helpers

    private func stageLabel(_ text: String, color: Color) -> some View {
        Text(text)
            .font(.footnote.bold())
            .foregroundStyle(color)
    }

    private var stageDivider: some View {
        Color(.systemGray5).frame(height: 1).padding(.top, 24)
    }

    // MARK: - SwiftData persistence

    private func loadFromRecord() {
        guard !didLoad else { return }
        if let r = record {
            recallText = r.recallText
            if r.questionStatus != nil { showAnswer = true }
            didLoad = true
        }
    }

    private func autoSaveRecall() {
        // Debounced auto-save handled on disappear; do quick insert if no record yet
        if record == nil && !recallText.isEmpty {
            let r = QuestionRecord(questionId: question.id, recallText: recallText)
            modelContext.insert(r)
        }
    }

    private func saveRecall() {
        if let r = record {
            if r.recallText != recallText {
                r.recallText = recallText
                r.updatedAt = Date()
            }
        } else if !recallText.isEmpty {
            let r = QuestionRecord(questionId: question.id, recallText: recallText)
            modelContext.insert(r)
        }
    }

    private func assess(_ status: QuestionStatus) {
        if let r = record {
            r.status = status.rawValue
            r.recallText = recallText
            r.updatedAt = Date()
        } else {
            let r = QuestionRecord(questionId: question.id, recallText: recallText, status: status.rawValue)
            modelContext.insert(r)
        }
        showToastMessage(appState.toastMessage(for: status))
    }

    private func showToastMessage(_ msg: String) {
        toastMessage = msg
        withAnimation { showToast = true }
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.2) {
            withAnimation { showToast = false }
        }
    }
}

// MARK: - Sub-views

private struct AssessButton: View {
    let title: String
    let status: QuestionStatus
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(isSelected ? .semibold : .regular)
                Spacer()
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(status.color)
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .background(isSelected ? status.color.opacity(0.12) : Color(.systemGray6))
            .foregroundStyle(isSelected ? status.color : Color.primary)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(isSelected ? status.color.opacity(0.4) : Color.clear, lineWidth: 1.5)
            )
        }
        .buttonStyle(.plain)
    }
}

private struct FollowUpRow: View {
    let fq: FollowUp
    let isExpanded: Bool
    let onToggle: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button(action: onToggle) {
                HStack(spacing: 10) {
                    Image(systemName: "chevron.right")
                        .font(.caption.bold())
                        .rotationEffect(.degrees(isExpanded ? 90 : 0))
                        .foregroundStyle(Color.accentColor)
                    Text(fq.q)
                        .font(.subheadline.weight(.medium))
                        .foregroundStyle(Color.primary)
                        .fixedSize(horizontal: false, vertical: true)
                        .multilineTextAlignment(.leading)
                    Spacer()
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
            }
            .buttonStyle(.plain)

            if isExpanded {
                HTMLText(html: fq.a)
                    .font(.subheadline)
                    .padding(.horizontal, 14)
                    .padding(.bottom, 14)
                    .foregroundStyle(.secondary)
                    .transition(.opacity)
            }
        }
    }
}

private struct ToastView: View {
    let message: String

    var body: some View {
        Text(message)
            .font(.subheadline.bold())
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(Color(.label))
            .foregroundStyle(Color(.systemBackground))
            .clipShape(Capsule())
            .shadow(radius: 8, y: 4)
    }
}
