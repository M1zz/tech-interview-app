import SwiftUI

struct ContentView: View {
    @StateObject private var appState = AppState()

    var body: some View {
        NavigationStack {
            QuestionListView()
                .navigationTitle(appState.navTitle)
                .navigationBarTitleDisplayMode(.large)
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button(appState.langToggleLabel) {
                            appState.toggleLanguage()
                        }
                        .fontWeight(.semibold)
                    }
                }
        }
        .environmentObject(appState)
    }
}
