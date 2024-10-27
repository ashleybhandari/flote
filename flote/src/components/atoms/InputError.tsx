type Props = {
  showError: boolean;
  message: string;
};

export default function InputError({ showError, message }: Props) {
  return (
    <div className="text-xs text-error mx-1 mt-1 h-6">
      {showError && (
        <>
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {message}
        </>
      )}
    </div>
  );
}
