import SwiftUI
import SwiftData

struct StatsHeaderView: View {
    @EnvironmentObject var appState: AppState
    @Query private var records: [QuestionRecord]

    private var masteredCount: Int { records.filter { $0.status == "mastered" }.count }
    private var partialCount:  Int { records.filter { $0.status == "partial"  }.count }
    private var unknownCount:  Int { records.filter { $0.status == "unknown"  }.count }

    var body: some View {
        VStack(spacing: 12) {
            // Progress bar
            VStack(alignment: .leading, spacing: 6) {
                Text(appState.progressLabel(mastered: masteredCount))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(Color(.systemGray5))
                            .frame(height: 8)
                        RoundedRectangle(cornerRadius: 4)
                            .fill(Color.green)
                            .frame(
                                width: appState.totalCount > 0
                                    ? geo.size.width * CGFloat(masteredCount) / CGFloat(appState.totalCount)
                                    : 0,
                                height: 8
                            )
                            .animation(.easeInOut(duration: 0.3), value: masteredCount)
                    }
                }
                .frame(height: 8)
            }

            // Stat counters
            HStack(spacing: 0) {
                StatChip(count: masteredCount, label: appState.statMasteredLabel, color: .green)
                Divider().frame(height: 32)
                StatChip(count: partialCount,  label: appState.statPartialLabel,  color: .orange)
                Divider().frame(height: 32)
                StatChip(count: unknownCount,  label: appState.statUnknownLabel,  color: .red)
            }
            .background(Color(.systemGray6))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color(.systemBackground))
    }
}

private struct StatChip: View {
    let count: Int
    let label: String
    let color: Color

    var body: some View {
        VStack(spacing: 2) {
            Text("\(count)")
                .font(.title3.bold())
                .foregroundStyle(color)
                .contentTransition(.numericText())
                .animation(.easeInOut(duration: 0.2), value: count)
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
    }
}
