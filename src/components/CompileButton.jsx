export default function CompileButton({ onClick, isCompiling }) {
  return (
    <button
      type="button"
      className="compile-btn"
      onClick={onClick}
      disabled={isCompiling}
    >
      {isCompiling ? (
        <>
          <span className="spinner" aria-hidden="true" />
          Compiling
        </>
      ) : (
        'Compile'
      )}
    </button>
  );
}
