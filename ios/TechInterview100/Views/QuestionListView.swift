import SwiftUI

struct QuestionListView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        VStack(spacing: 0) {
            StatsHeaderView()
            Divider()
            FilterBarView()
            Divider()

            if appState.filteredQuestions.isEmpty {
                emptyState
            } else {
                List {
                    ForEach(appState.filteredQuestions) { question in
                        NavigationLink {
                            QuestionDetailView(question: question)
                        } label: {
                            QuestionRowView(question: question)
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
