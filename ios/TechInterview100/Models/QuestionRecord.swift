import Foundation
import SwiftData

@Model
final class QuestionRecord {
    @Attribute(.unique) var questionId: Int
    var recallText: String
    var status: String          // "unknown" | "partial" | "mastered" | ""
    var createdAt: Date
    var updatedAt: Date

    init(questionId: Int, recallText: String = "", status: String = "") {
        self.questionId = questionId
        self.recallText = recallText
        self.status = status
        self.createdAt = Date()
        self.updatedAt = Date()
    }

    var questionStatus: QuestionStatus? {
        QuestionStatus(rawValue: status)
    }
}
