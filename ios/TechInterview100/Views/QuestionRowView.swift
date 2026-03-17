import SwiftUI

struct QuestionRowView: View {
    let question: Question
    let status: QuestionStatus?

    var body: some View {
        HStack(spacing: 12) {
            // Question number
            Text(String(format: "%02d", question.id))
                .font(.caption.monospacedDigit())
                .foregroundStyle(.secondary)
                .frame(width: 24, alignment: .trailing)

            // Question text + category
            VStack(alignment: .leading, spacing: 4) {
                Text(question.q)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
                    .foregroundStyle(Color.primary)

                Text(question.cat)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            // Status indicator
            Circle()
                .fill(status?.color ?? Color(.systemGray4))
                .frame(width: 8, height: 8)
        }
        .padding(.vertical, 10)
    }
}
