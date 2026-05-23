type AlertBannerProps = {
  message: string;
  type: 'success' | 'error';
};

export default function AlertBanner({
  message,
  type,
}: AlertBannerProps) {

  if (!message) return null;

  return (
    <div
      className={`p-3 rounded mb-4 text-white
      ${
        type === 'success'
          ? 'bg-green-600'
          : 'bg-red-600'
      }`}
    >
      {type === 'success'
        ? '✅ '
        : '❌ '}
      {message}
    </div>
  );
}