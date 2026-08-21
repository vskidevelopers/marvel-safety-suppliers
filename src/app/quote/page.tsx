import { QuoteForm } from "./quote-form";

export default function QuoteRequestPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Request Bulk Quote</h1>
                <p className="text-gray-600 mt-2">
                    Get a customized quote for your organization&apos;s safety equipment needs
                </p>
            </div>

            <QuoteForm />
        </div>
    );
}
