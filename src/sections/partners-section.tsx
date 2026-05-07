import { MarvelLogoCloud } from "@/components/ui/logo-cloud-marvel";

export function PartnersSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Trusted by Kenya’s Leading Institutions
                    </h2>
                    <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        From government agencies to industrial giants, Marvel Safety supplies
                        certified PPE to organizations that demand compliance and reliability.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -top-6 left-0 w-full h-px bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black_80%,transparent)]" />
                    <MarvelLogoCloud folder="marvel-safety/partners" />
                    <div className="absolute -bottom-6 left-0 w-full h-px bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black_80%,transparent)]" />
                </div>
            </div>
        </section>
    );
}