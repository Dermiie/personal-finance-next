import Image from 'next/image';

function PaperPlaneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M21.4 2.6a1 1 0 0 0-1-.2L2.9 9.2a1 1 0 0 0-.1 1.8l6.3 2.9 2.9 6.3a1 1 0 0 0 1.8-.1l6.8-17.5a1 1 0 0 0-.2-1Zm-9.1 14.1-1.6-3.5 6.6-6.6-5 10.1Z" />
    </svg>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <Image
        src={src?.replace('./', '/') || ''}
        alt={name}
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#7f6bae]">
      <PaperPlaneIcon />
    </span>
  );
}

export default Avatar;
