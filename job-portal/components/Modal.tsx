'use client';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button style={styles.close} onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

const styles: any = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  box: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    width: '400px',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
  },
};