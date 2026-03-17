import SwiftUI
import SwiftData

struct QuestionListView: View {
    @EnvironmentObject var appState: AppState
    @Query private var records: [QuestionRecord]

    private func recordStatus(for id: Int) -> QuestionStatus? {
        guard let r = records.first(where: { $0.questionId == id }), !r.status.isEmpty
        else { return nil }
        return QuestionStatus(rawValue: r.status)
    }

    private var displayedQuestions: [Question] {
        appState.questions.filter { q in
            let status = recordStatus(for: q.id)
            let matchFilter: Bool
            switch appState.selectedFilter {
            case .all:                   matchFilter = true
            case .mastered:              matchFilter = status == .mastered
            case .unknown:               matchFilter = status == .unknown
            case .category(let cat):     matchFilter = q.cat == cat
            }
            let matchSearch = appState.searchText.isEmpty
                || q.q.localizedCaseInsensitiveContains(appState.searchText)
            return matchFilter && matchSearch
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            StatsHeaderView()
            Divider()
            FilterBarView()
            Divider()

            if displayedQuestions.isEmpty {
                emptyState
            } else {
                List {
                    ForEach(displayedQuestions) { question in
                        NavigationLink {
                            QuestionDetailView(question: question)
                        } label: {
                            QuestionRowView(
                                question: question,
                                status: recordStatus(for: question.id)
                            )
                        }
                        .listRowInsets(EdgeInsets(top: 0, leading: 16, bottom: 0, trailing: 16))
                    }
                }
                .listStyle(.plain)
            }
        }
        .searchable(
            text: $appState.searchText,
            placement: .navigationBarDrawer(displayMode: .always),
            prompt: appState.searchPrompt
        )
    }

    private var emptyState: some View {
        VStack(spacing: 12) {
            Text("🔍")
                .font(.system(size: 48))
            Text(appState.language == .ko ? "검색 결과가 없어요" : "No results found")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
