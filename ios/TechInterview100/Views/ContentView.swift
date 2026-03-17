import SwiftUI

struct ContentView: View {
    @StateObject private var appState = AppState()
    @State private var pdfURL: URL?
    @State private var isGeneratingPDF = false
    @State private var showShareSheet = false

    var body: some View {
        NavigationStack {
            QuestionListView()
                .navigationTitle(appState.navTitle)
                .navigationBarTitleDisplayMode(.large)
                .toolbar {
                    ToolbarItemGroup(placement: .navigationBarTrailing) {
                        // PDF export
                        Button {
                            generatePDF()
                        } label: {
                            if isGeneratingPDF {
                                ProgressView()
                                    .scaleEffect(0.8)
                            } else {
                                Image(systemName: "doc.richtext")
                            }
                        }
                        .disabled(isGeneratingPDF)

                        // Language toggle
                        Button(appState.langToggleLabel) {
                            appState.toggleLanguage()
                            pdfURL = nil
                        }
                        .fontWeight(.semibold)
                    }
                }
        }
        .environmentObject(appState)
        .sheet(isPresented: $showShareSheet) {
            if let url = pdfURL {
                ShareSheet(activityItems: [url])
            }
        }
    }

    // MARK: - PDF generation

    private func generatePDF() {
        isGeneratingPDF = true
        let questions = appState.questions
        let isKorean  = appState.language == .ko
        let filename  = appState.pdfFilename + ".pdf"

        Task.detached(priority: .userInitiated) {
            let data = PDFGenerator.generate(questions: questions, isKorean: isKorean)
            let url  = FileManager.default.temporaryDirectory.appendingPathComponent(filename)
            try? data.write(to: url)

            await MainActor.run {
                pdfURL = url
                isGeneratingPDF = false
                showShareSheet = true
            }
        }
    }
}

// MARK: - UIActivityViewController wrapper

struct ShareSheet: UIViewControllerRepresentable {
    let activityItems: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }

    func updateUIViewController(_ vc: UIActivityViewController, context: Context) {}
}
