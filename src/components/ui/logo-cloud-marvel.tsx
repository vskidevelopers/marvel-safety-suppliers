import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import { usePartnerLogos } from "@/lib/hooks/use-partner-logos";
import { PartnerLogo } from "@/lib/hooks/use-partner-logos";

interface MarvelLogoCloudProps extends React.ComponentProps<"div"> {
    folder?: string;
}

export function MarvelLogoCloud({
    className,
    folder = "marvel-safety/partners",
    ...props
}: MarvelLogoCloudProps) {
    const { logos, loading, error } = usePartnerLogos(folder);

    if (loading) {
        return (
            <div className="py-6">
                <div className="flex justify-center space-x-8 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-gray-200 rounded" />
                    ))}
                </div>
            </div>
        );
    }

    if (error || logos.length === 0) {
        return null; // or show fallback
    }

    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_80%,transparent)]",
                className
            )}
        >
            <InfiniteSlider
                gap={48}
                speed={90}
                speedOnHover={30}
                reverse
            >
                {logos.map((logo: PartnerLogo) => (
                    <div
                        key={logo.public_id}
                        className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <img
                            alt={logo.public_id.split('/').pop() || "Partner logo"}
                            className="h-10 w-auto md:h-18 select-none grayscale hover:grayscale-0 transition-all"
                            src={logo.secure_url}
                            loading="lazy"
                        />
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}