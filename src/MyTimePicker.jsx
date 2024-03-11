import * as React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

export default function BasicTimePicker({time, setTime}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'TimePicker']}>
            <DemoItem>
              <MultiSectionDigitalClock
                defaultValue={dayjs('2022-04-17T00:00')}
                ampm={false}
                onChange={e => setTime('' + e.$H + ':' + e.$m)}
                style={{height: 50}}
                view='minutes'
              />
            </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}