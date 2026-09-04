import React, { useRef } from 'react';
import { Box, IconButton, Tooltip, MenuItem, Select } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import './CKEditorField.css';

const CKEditorField = ({ initialContent, placeholder }) => {
  const editableRef = useRef(null);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editableRef.current) {
      editableRef.current.focus();
    }
  };

  const handleHeaderChange = (e) => {
    const value = e.target.value;
    if (value === 'p') {
      executeCommand('formatBlock', '<p>');
    } else {
      executeCommand('formatBlock', `<${value}>`);
    }
  };

  return (
    <div className="ckeditor-container">
      {/* CKEditor 5 Toolbar */}
      <div className="ckeditor-toolbar">
        {/* Paragraph / Heading Select */}
        <div className="ckeditor-btn-group">
          <Select
            defaultValue="p"
            size="small"
            onChange={handleHeaderChange}
            sx={{
              height: '28px',
              fontSize: '12.5px',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d0d7de' },
            }}
          >
            <MenuItem value="p">Đoạn văn (Paragraph)</MenuItem>
            <MenuItem value="h2">Tiêu đề lớn (Heading 2)</MenuItem>
            <MenuItem value="h3">Tiêu đề nhỏ (Heading 3)</MenuItem>
          </Select>
        </div>

        {/* Text Style: Bold, Italic, Underline */}
        <div className="ckeditor-btn-group">
          <Tooltip title="In đậm (Ctrl+B)">
            <IconButton size="small" onClick={() => executeCommand('bold')}>
              <FormatBoldIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="In nghiêng (Ctrl+I)">
            <IconButton size="small" onClick={() => executeCommand('italic')}>
              <FormatItalicIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gạch chân (Ctrl+U)">
            <IconButton size="small" onClick={() => executeCommand('underline')}>
              <FormatUnderlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Lists & Quote */}
        <div className="ckeditor-btn-group">
          <Tooltip title="Danh sách chấm (Bulleted List)">
            <IconButton size="small" onClick={() => executeCommand('insertUnorderedList')}>
              <FormatListBulletedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Danh sách số (Numbered List)">
            <IconButton size="small" onClick={() => executeCommand('insertOrderedList')}>
              <FormatListNumberedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Trích dẫn (Blockquote)">
            <IconButton size="small" onClick={() => executeCommand('formatBlock', 'blockquote')}>
              <FormatQuoteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Link */}
        <div className="ckeditor-btn-group">
          <Tooltip title="Chèn đường dẫn (Link)">
            <IconButton
              size="small"
              onClick={() => {
                const url = prompt('Nhập đường dẫn URL:');
                if (url) executeCommand('createLink', url);
              }}
            >
              <InsertLinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Alignment */}
        <div className="ckeditor-btn-group">
          <Tooltip title="Căn trái">
            <IconButton size="small" onClick={() => executeCommand('justifyLeft')}>
              <FormatAlignLeftIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Căn giữa">
            <IconButton size="small" onClick={() => executeCommand('justifyCenter')}>
              <FormatAlignCenterIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Căn phải">
            <IconButton size="small" onClick={() => executeCommand('justifyRight')}>
              <FormatAlignRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Undo / Redo */}
        <div className="ckeditor-btn-group">
          <Tooltip title="Hoàn tác (Undo)">
            <IconButton size="small" onClick={() => executeCommand('undo')}>
              <UndoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Làm lại (Redo)">
            <IconButton size="small" onClick={() => executeCommand('redo')}>
              <RedoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <span className="ckeditor-badge">CKEditor 5</span>
        </Box>
      </div>

      {/* Editable Text Area */}
      <div
        ref={editableRef}
        className="ckeditor-editable"
        contentEditable
        suppressContentEditableWarning
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: initialContent || '' }}
      />
    </div>
  );
};

export default CKEditorField;
