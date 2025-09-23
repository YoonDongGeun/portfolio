interface TechStackItemProps {
  iconSrc?: string;
  alt: string;
  name: string;
  bgColor?: string;
  svgIcon?: React.ReactNode;
}

export default function TechStackItem({
  iconSrc,
  alt,
  name,
  bgColor = "bg-green-600/30 text-green-300",
  svgIcon
}: TechStackItemProps) {
  return (
    <span className={`flex items-center gap-2 px-6 py-3 ${bgColor} rounded-lg font-medium`}>
      {svgIcon ? (
        svgIcon
      ) : (
        <img src={iconSrc} alt={alt} className="w-5 h-5" />
      )}
      {name}
    </span>
  );
}