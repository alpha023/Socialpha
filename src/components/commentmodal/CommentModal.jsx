import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
//   display:'flex',
//   flexDirection:'column',
  overflow:'auto',
//   overflowY:'scroll',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CommentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
    <div className="commentUser">
      <div className="commentUserWrapper">
        <div className="commentInfo">
          <img
            className="commentProfilePic"
            src={'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg'}
            alt="ijo4"
          />
          <div className="commentTextInfo">
            <span className="profileName">Amit Kumar Pal</span>
            <br />
            <span className="commentText">Nyyyccc Pic...</span>
          </div>
        </div>
        
      </div>
      <div className="commentLikeReplyInfo">
          <span className="commentLike">like</span>
          <span className="commentReply">reply</span>
        </div>
      <hr/>
    </div>
        </Box>
      </Modal>
    </div>
  );
}