import Image from "next/image";

export default function PageBanner({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[21/9] w-full overflow-hidden rounded-[1.75rem] ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1400px) 100vw, 1400px" />
    </div>
  );
}
