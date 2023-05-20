import React from "react";
import { socialMediaLinks } from "../../Details";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  BsFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/all";
const SocialMedia = () => {
  return (
    <div className="font-sans flex justify-start items-center gap-4 text-gray-300">
      {socialMediaLinks.github ? (
        <Link to={socialMediaLinks.github} target="_blank">
          <AiFillGithub size={35} />
        </Link>
      ) : null}
      {socialMediaLinks.facebook ? (
        <Link to={socialMediaLinks.facebook} target="_blank">
          <BsFacebook size={32} />
        </Link>
      ) : null}
      {socialMediaLinks.instagram ? (
        <Link to={socialMediaLinks.instagram} target="_blank">
          <AiFillInstagram size={37} />
        </Link>
      ) : null}
      {socialMediaLinks.linkedIn ? (
        <Link to={socialMediaLinks.linkedIn} target="_blank">
          <AiFillLinkedin size={36} />
        </Link>
      ) : null}
      {socialMediaLinks.twitter ? (
        <Link to={socialMediaLinks.twitter} target="_blank">
          <AiOutlineTwitter size={37} />
        </Link>
      ) : null}
    </div>
  );
};

export default SocialMedia;
