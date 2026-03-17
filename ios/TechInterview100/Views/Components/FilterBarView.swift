import SwiftUI

struct FilterBarView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                FilterChip(
                    title: appState.filterAllLabel,
                    isSelected: appState.selectedFilter == .all
                ) {
                    appState.selectedFilter = .all
                }
                FilterChip(
                    title: appState.filterMasteredLabel,
                    isSelected: appState.selectedFilter == .mastered
                ) {
                    appState.selectedFilter = .mastered
                }
                FilterChip(
                    title: appState.filterUnknownLabel,
                    isSelected: appState.selectedFilter == .unknown
                ) {
                    appState.selectedFilter = .unknown
                }
                ForEach(appState.categories, id: \.self) { cat in
                    FilterChip(
                        title: cat,
                        isSelected: appState.selectedFilter == .category(cat)
                    ) {
                        appState.selectedFilter = .category(cat)
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
        }
        .background(Color(.systemBackground))
    }
}

private struct FilterChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline)
                .fontWeight(isSelected ? .semibold : .regular)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.accentColor : Color(.systemGray6))
                .foregroundStyle(isSelected ? Color.white : Color.primary)
                .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}
