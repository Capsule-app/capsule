import React from "react";

export const DefaultAvatar: React.FC<{
  className: string;
  imgClassName: string;
}> = ({ className, imgClassName }) => {
  return (
    <div className={className}>
      <img
        src="https://raw.githubusercontent.com/oasis-sh/oasis/2c397012ae45dbb5bb7951405b8be8b75f0589f8/assets/logos/svg/icon.svg"
        className={imgClassName}
      />
    </div>
  );
};
