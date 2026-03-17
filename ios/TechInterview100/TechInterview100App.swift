import SwiftUI
import SwiftData

@main
struct TechInterview100App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: QuestionRecord.self)
    }
}
