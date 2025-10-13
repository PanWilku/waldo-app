interface GameHeaderProps {
  title: string;
  subtitle?: string;
}

export default function GameHeader({ title, subtitle }: GameHeaderProps) {
  return (
    <div className="text-center py-4">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
}
