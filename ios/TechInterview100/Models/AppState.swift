import Foundation
import SwiftUI

enum QuestionStatus: String, Codable {
    case unknown = "unknown"
    case partial = "partial"
    case mastered = "mastered"

    var color: Color {
        switch self {
        case .unknown: return .red
        case .partial: return .orange
        case .mastered: return .green
        }
    }

    var icon: String {
        switch self {
        case .unknown: return "😵"
        case .partial: return "🤔"
        case .mastered: return "💡"
        }
    }
}

enum AppLanguage: String {
    case ko = "ko"
    case en = "en"
}

enum FilterType: Hashable {
    case all
    case mastered
    case unknown
    case category(String)
}

class AppState: ObservableObject {
    @Published var language: AppLanguage
    @Published var searchText: String = ""
    @Published var selectedFilter: FilterType = .all

    var questions: [Question] {
        language == .ko ? DataLoader.questionsKO : DataLoader.questionsEN
    }

    var categories: [String] {
        var seen = Set<String>()
        return questions.compactMap { q in
            seen.insert(q.cat).inserted ? q.cat : nil
        }
    }

    var totalCount: Int { questions.count }

    // MARK: - i18n strings

    var navTitle: String           { language == .ko ? "기술 면접 훈련 100" : "Tech Interview 100" }
    var langToggleLabel: String    { language == .ko ? "EN" : "KO" }
    var searchPrompt: String       { language == .ko ? "🔍 질문 검색..." : "🔍 Search questions..." }
    var filterAllLabel: String     { language == .ko ? "전체" : "All" }
    var filterMasteredLabel: String{ language == .ko ? "💡 이해" : "💡 Mastered" }
    var filterUnknownLabel: String { language == .ko ? "😵 모름" : "😵 Unknown" }
    var statMasteredLabel: String  { language == .ko ? "이해" : "Known" }
    var statPartialLabel: String   { language == .ko ? "부분" : "Partial" }
    var statUnknownLabel: String   { language == .ko ? "모름" : "Unknown" }
    var stage1Label: String        { language == .ko ? "01 · 백지 소환" : "01 · Blank Recall" }
    var stage1Prompt: String       { language == .ko ? "모범답안을 보기 전에 지금 알고 있는 것을 직접 써보세요. 빈칸이어도 괜찮아요." : "Write down what you know before seeing the answer. It's okay to leave it blank." }
    var stage1Placeholder: String  { language == .ko ? "여기에 설명을 작성하세요..." : "Type your explanation here..." }
    var revealBtnLabel: String     { language == .ko ? "모범답안 보기 →" : "Show Answer →" }
    var stage2Label: String        { language == .ko ? "02 · 모범답안" : "02 · Model Answer" }
    var stage3Label: String        { language == .ko ? "03 · 자가 판정" : "03 · Self Assessment" }
    var stage3Subtitle: String     { language == .ko ? "모범답안과 비교해서 얼마나 알고 있었나요?" : "How well did you know it compared to the answer?" }
    var assessUnknown: String      { language == .ko ? "😵 몰랐다" : "😵 Didn't know" }
    var assessPartial: String      { language == .ko ? "🤔 어렴풋이 알았다" : "🤔 Had a vague idea" }
    var assessMastered: String     { language == .ko ? "💡 명확하게 설명할 수 있다" : "💡 Can explain clearly" }
    var stage4Label: String        { language == .ko ? "04 · 꼬리 질문" : "04 · Follow-up Questions" }
    var stage5Label: String        { language == .ko ? "05 · 오개념 찾기" : "05 · Spot the Misconception" }
    var trapPrompt: String         { language == .ko ? "아래 설명에서 틀린 부분을 찾아보세요 👀" : "Find the mistake in the statement below 👀" }
    var trapBtnLabel: String       { language == .ko ? "틀린 이유 보기" : "Show why it's wrong" }
    var pdfExportLabel: String     { language == .ko ? "PDF 내보내기" : "Export PDF" }
    var pdfFilename: String        { language == .ko ? "기술_면접_훈련_100" : "Tech_Interview_100" }

    func progressLabel(mastered: Int) -> String {
        language == .ko ? "\(mastered) / \(totalCount) 이해 완료" : "\(mastered) / \(totalCount) mastered"
    }

    func toastMessage(for status: QuestionStatus) -> String {
        switch status {
        case .mastered: return language == .ko ? "💡 이해 완료로 표시했어요!" : "💡 Marked as mastered!"
        case .partial:  return language == .ko ? "🤔 부분 이해로 표시했어요." : "🤔 Marked as partial."
        case .unknown:  return language == .ko ? "😵 다시 공부할 목록에 추가했어요." : "😵 Added to review list."
        }
    }

    // MARK: - Init / Language

    init() {
        let saved = UserDefaults.standard.string(forKey: "ti_lang") ?? "ko"
        language = saved == "en" ? .en : .ko
    }

    func toggleLanguage() {
        language = language == .ko ? .en : .ko
        UserDefaults.standard.set(language.rawValue, forKey: "ti_lang")
        selectedFilter = .all
        searchText = ""
    }
}
