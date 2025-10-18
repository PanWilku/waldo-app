interface GameHeaderProps {
  title: string;
  subtitle?: string;
}

export default function GameHeader({ title, subtitle }: GameHeaderProps) {
  return (
    <div className="text-center py-4">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        🔍 {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-300 mt-2 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-rose-400 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}
