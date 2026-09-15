import React from 'react';
import { Box, Typography } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import logoImg from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="topcv-footer">
      <div className="topcv-container">
        {/* Top SEO Keyword Links Section */}
        <div className="footer-top-links">
          <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#212f3f' }}>
            Từ khóa việc làm nổi bật
          </Typography>
          <div className="footer-seo-keywords">
            {[
              'Việc làm Hà Nội',
              'Việc làm TP.HCM',
              'Việc làm Đà Nẵng',
              'Việc làm IT',
              'Việc làm Kinh doanh',
              'Việc làm Marketing',
              'Việc làm Kế toán',
              'Việc làm Nhân sự',
              'Việc làm Tiếng Anh',
              'Việc làm Ngân hàng',
              'Việc làm Thực tập sinh',
              'Việc làm Remote',
            ].map((kw, idx) => (
              <a key={idx} href="#" className="footer-keyword-item">
                {kw}
              </a>
            ))}
          </div>
        </div>

        {/* Footer 5 Columns Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Contact Info */}
          <div>
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ display: 'inline-block', mb: 1.5, cursor: 'pointer' }}
            >
              <img
                src={logoImg}
                alt="TopCV"
                style={{ height: '42px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </Box>

            <Typography sx={{ fontSize: '13px', color: '#666666', mb: 2, lineHeight: 1.6 }}>
              Công ty Cổ phần TopCV Việt Nam
              <br />
              Giấy phép ĐKKD số: 0107302258 do Sở KH&ĐT TP.Hà Nội cấp.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneInTalkIcon sx={{ fontSize: '18px', color: '#00b14f' }} />
                <Typography sx={{ fontSize: '13.5px', color: '#333', fontWeight: 600 }}>
                  Hotline: 1900 068 889 (Nhánh 2)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailOutlinedIcon sx={{ fontSize: '18px', color: '#00b14f' }} />
                <Typography sx={{ fontSize: '13.5px', color: '#333' }}>
                  Email: hotro@topcv.vn
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: '18px', color: '#00b14f', mt: 0.2 }} />
                <Typography sx={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>
                  Tầng 3, Tòa nhà Goldseason, 47 Nguyễn Tuân, Thanh Xuân, Hà Nội.
                </Typography>
              </Box>
            </Box>
          </div>

          {/* Column 2: Về TopCV */}
          <div>
            <div className="footer-col-title">Về TopCV</div>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#">Giới thiệu</a></li>
              <li className="footer-list-item"><a href="#">Góc báo chí</a></li>
              <li className="footer-list-item"><a href="#">Tuyển dụng</a></li>
              <li className="footer-list-item"><a href="#">Liên hệ</a></li>
              <li className="footer-list-item"><a href="#">Hỏi đáp</a></li>
              <li className="footer-list-item"><a href="#">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Column 3: Đối tác */}
          <div>
            <div className="footer-col-title">Hồ sơ & CV</div>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#">Mẫu CV xin việc</a></li>
              <li className="footer-list-item"><a href="#">Mẫu Cover Letter</a></li>
              <li className="footer-list-item"><a href="#">Hướng dẫn viết CV</a></li>
              <li className="footer-list-item"><a href="#">TopCV Profile</a></li>
              <li className="footer-list-item"><a href="#">Tính lương GROSS-NET</a></li>
            </ul>
          </div>

          {/* Column 4: Xây dựng sự nghiệp */}
          <div>
            <div className="footer-col-title">Xây dựng sự nghiệp</div>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#">Trắc nghiệm MBTI</a></li>
              <li className="footer-list-item"><a href="#">Trắc nghiệm MI</a></li>
              <li className="footer-list-item"><a href="#">Cẩm nang nghề nghiệp</a></li>
              <li className="footer-list-item"><a href="#">Thị trường lao động</a></li>
            </ul>
          </div>

          {/* Column 5: Ứng dụng di động & Mã QR */}
          <div>
            <div className="footer-col-title">Tải ứng dụng TopCV</div>
            <Typography sx={{ fontSize: '12.5px', color: '#666', mb: 1.5 }}>
              Tìm việc mọi lúc, mọi nơi ngay trên điện thoại di động của bạn.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box
                sx={{
                  width: '72px',
                  height: '72px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  border: '1px solid #e0e0e0',
                }}
              >
                {/* QR Code SVG */}
                <svg width="60" height="60" viewBox="0 0 24 24">
                  <path fill="#333" d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h8v8h-8V2zm2 2v4h4V4h-4zM2 15h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2z" />
                </svg>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  App Store
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: '#00b14f',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Google Play
                </Box>
              </Box>
            </Box>
          </div>
        </div>

        {/* Bottom Bar Copyright */}
        <div className="footer-bottom-bar">
          <Typography sx={{ fontSize: '12.5px', color: '#888888' }}>
            © 2014 - 2026 Bản quyền thuộc về Công ty Cổ phần TopCV Việt Nam.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <a href="#" className="footer-keyword-item">Điều khoản dịch vụ</a>
            <a href="#" className="footer-keyword-item">Chính sách bảo mật</a>
          </Box>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
