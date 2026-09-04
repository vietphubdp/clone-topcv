import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import JobCard from '../../components/HotJobs/JobCard';
import { mockJobs } from '../../data/mockJobs';

const JobDetailMain = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Box>
      {/* Detailed Description Card */}
      <div className="job-content-card">
        {/* Section Title */}
        <Typography variant="h6" className="job-section-title">
          Chi tiết tin tuyển dụng
        </Typography>

        {/* 1. Mô tả công việc */}
        <Typography sx={{ fontWeight: 800, fontSize: '15.5px', color: '#212f3f', mb: 1, mt: 2 }}>
          1. Mô tả công việc
        </Typography>
        <ul className="job-detail-bullet-list">
          <li>Tìm kiếm, tiếp cận và phát triển mạng lưới khách hàng tiềm năng cho công ty.</li>
          <li>Tư vấn, giới thiệu các sản phẩm, giải pháp kinh doanh cho khách hàng doanh nghiệp và cá nhân.</li>
          <li>Đàm phán, thương lượng hợp đồng và hỗ trợ khách hàng hoàn tất quy trình mua hàng.</li>
          <li>Chăm sóc khách hàng hiện tại, duy trì mối quan hệ hợp tác lâu dài bền vững.</li>
          <li>Đạt và vượt các chỉ tiêu doanh số được giao theo tuần, tháng, quý.</li>
          <li>Thực hiện báo cáo công việc định kỳ cho Trưởng phòng Kinh doanh.</li>
        </ul>

        {/* 2. Yêu cầu ứng viên */}
        <Typography sx={{ fontWeight: 800, fontSize: '15.5px', color: '#212f3f', mb: 1, mt: 3 }}>
          2. Yêu cầu ứng viên
        </Typography>
        <ul className="job-detail-bullet-list">
          <li>Nam/Nữ độ tuổi từ 22 - 32 tuổi.</li>
          <li>Tốt nghiệp Cao đẳng/Đại học trở lên các chuyên ngành Kinh tế, Quản trị kinh doanh, Marketing hoặc liên quan.</li>
          <li>Có ít nhất 1 năm kinh nghiệm tại vị trí Nhân viên kinh doanh, Tư vấn bán hàng hoặc Phát triển thị trường.</li>
          <li>Giao tiếp tốt, nhanh nhẹn, tư duy linh hoạt và có khả năng giải quyết tình huống tốt.</li>
          <li>Chủ động, trung thực, có tinh thần cầu tiến và chịu được áp lực công việc cao.</li>
          <li>Sử dụng thành thạo máy tính văn phòng (Word, Excel, PowerPoint).</li>
          <li>Ưu tiên ứng viên có kinh nghiệm trong ngành Thương mại điện tử, Bán lẻ hoặc B2B.</li>
        </ul>

        {/* 3. Quyền lợi */}
        <Typography sx={{ fontWeight: 800, fontSize: '15.5px', color: '#212f3f', mb: 1, mt: 3 }}>
          3. Quyền lợi được hưởng
        </Typography>
        <ul className="job-detail-bullet-list">
          <li>Thu nhập hấp dẫn từ <strong>15 - 30 triệu/tháng</strong> (Lương cứng 8 - 12 triệu + % Hoa hồng + Thưởng doanh số).</li>
          <li>Thưởng nóng, thưởng hiệu quả công việc vượt chỉ tiêu hàng tháng, hàng quý.</li>
          <li>Được tham gia đóng BHXH, BHYT, BHTN đầy đủ theo quy định của Luật lao động.</li>
          <li>Lương tháng 13, thưởng các ngày Lễ, Tết trong năm.</li>
          <li>Được tham gia các khóa đào tạo nâng cao kỹ năng bán hàng, tư vấn chuyên nghiệp từ Ban lãnh đạo.</li>
          <li>Môi trường làm việc trẻ trung, năng động, đồng nghiệp thân thiện, hỗ trợ tối đa.</li>
          <li>Chế độ du lịch, nghỉ mát hàng năm cùng công ty; hoạt động Teambuilding hàng quý.</li>
        </ul>

        {/* 4. Địa điểm làm việc */}
        <Typography sx={{ fontWeight: 800, fontSize: '15.5px', color: '#212f3f', mb: 1, mt: 3 }}>
          4. Địa điểm làm việc
        </Typography>
        <Typography sx={{ fontSize: '14.5px', color: '#333333', mb: 2 }}>
          - <strong>Hà Nội:</strong> Tòa nhà Goldseason, 47 Nguyễn Tuân, Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội.
        </Typography>

        {/* 5. Thời gian làm việc */}
        <Typography sx={{ fontWeight: 800, fontSize: '15.5px', color: '#212f3f', mb: 1, mt: 3 }}>
          5. Thời gian làm việc
        </Typography>
        <Typography sx={{ fontSize: '14.5px', color: '#333333', mb: 3 }}>
          - <strong>Thứ 2 - Thứ 6:</strong> Từ 08h00 đến 17h30 (Nghỉ trưa 12h00 - 13h30).
          <br />- <strong>Thứ 7:</strong> Làm việc buổi sáng (08h00 - 12h00). Nghỉ Chiều Thứ 7 & Chủ nhật.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Application Bottom Action */}
        <Box sx={{ backgroundColor: '#f8fafc', p: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '14px', color: '#666', mb: 2 }}>
            Hạn nộp hồ sơ: <span style={{ color: '#00b14f', fontWeight: 800 }}>30/09/2026</span>. Hãy ứng tuyển ngay hôm nay để không bỏ lỡ cơ hội hấp dẫn này!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => alert('Ứng tuyển thành công!')}
              sx={{
                backgroundColor: '#00b14f',
                color: '#ffffff',
                borderRadius: '24px',
                px: 4,
                py: 1.2,
                fontSize: '15px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(0, 177, 79, 0.3)',
                '&:hover': { backgroundColor: '#009643' },
              }}
            >
              Ứng tuyển ngay
            </Button>

            <Button
              variant="outlined"
              startIcon={isSaved ? <FavoriteIcon sx={{ color: '#00b14f' }} /> : <FavoriteBorderIcon />}
              onClick={() => setIsSaved(!isSaved)}
              sx={{
                borderColor: '#00b14f',
                color: '#00b14f',
                borderRadius: '24px',
                px: 3,
                py: 1.2,
                fontSize: '14.5px',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#e6f7ef', borderColor: '#00b14f' },
              }}
            >
              {isSaved ? 'Đã lưu tin' : 'Lưu tin'}
            </Button>
          </Box>
        </Box>
      </div>

      {/* Related Jobs Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" className="job-section-title">
          Việc làm tương tự dành cho bạn
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
            mt: 2,
          }}
        >
          {mockJobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetailMain;
