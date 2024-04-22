import { FaShare } from 'react-icons/fa';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
const ShareButtons = ({ apartment }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/apartments/${apartment._id}`;
  return (
    <>
      <h3 className="text-xl font-bol text-center pt-2">
        Share this apartment
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={apartment.name}
          hashtag={`#${apartment.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={apartment.name}
          hashtags={[`${apartment.type.replace(/\s/g, '')}ForRent`]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={apartment.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={apartment.name}
          body={`Check out this apartment:${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
