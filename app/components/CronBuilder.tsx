import React, { useEffect, useState } from 'react';
import { Input, Form, Radio, Button } from 'antd';

function CronBuilder({ job, onSave, onCancel, onDelete }) {
  const [command, setCommand] = useState(job.job.command());
  const [name, setName] = useState(job.job.comment());
  const [minute, setMinute] = useState(job.job.minute());
  const [hour, setHour] = useState(job.job.hour());
  const [day, setDay] = useState(job.job.dom());
  const [month, setMonth] = useState(job.job.month());
  const [weekday, setWeekday] = useState(job.job.dow());
  const [frequency, setFrequency] = useState(job.key ? 'custom' : 'minutely');

  const help = (preset: React.SetStateAction<string>) => {
    setFrequency(preset);

    switch (preset) {
      case 'minutely':
        setMinute('*');
        setHour('*');
        setDay('*');
        setMonth('*');
        setWeekday('*');
        break;
      case 'hourly':
        setMinute('0');
        setHour('*');
        setDay('*');
        setMonth('*');
        setWeekday('*');
        break;
      case 'nightly':
        setMinute('0');
        setHour('0');
        setDay('*');
        setMonth('*');
        setWeekday('*');
        break;
      case 'weekly':
        setMinute('0');
        setHour('0');
        setDay('*');
        setMonth('*');
        setWeekday('1');
        break;
      case 'monthly':
        setMinute('0');
        setHour('0');
        setDay('1');
        setMonth('*');
        setWeekday('*');
        break;
      default:
        break;
    }
  };

  const save = () => {
    onSave(job, {
      command,
      name,
      minute,
      hour,
      day,
      month,
      weekday
    });
  };

  const cancel = () => onCancel();

  const remove = () => onDelete(job);

  useEffect(() => {
    setName(job.job.comment());
    setCommand(job.job.command());
    setMinute(job.job.minute());
    setHour(job.job.hour());
    setDay(job.job.dom());
    setMonth(job.job.month());
    setWeekday(job.job.dow());
    setFrequency(job.key ? 'custom' : 'minutely');
  }, [job]);

  return (
    <Form layout="vertical">
      <Form.Item label="Name / Comment">
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Command">
        <Input value={command} onChange={e => setCommand(e.target.value)} />
      </Form.Item>
      <Form.Item label="Every">
        <Radio.Group
          value={frequency}
          onChange={e => help(e.target.value)}
          size="large"
          defaultValue={frequency}
          buttonStyle="solid"
        >
          <Radio.Button value="minutely">Minute</Radio.Button>
          <Radio.Button value="hourly">Hour</Radio.Button>
          <Radio.Button value="nightly">Night</Radio.Button>
          <Radio.Button value="weekly">Week</Radio.Button>
          <Radio.Button value="monthly">Month</Radio.Button>
          <Radio.Button value="custom">Custom</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Custom">
        <Input.Group compact>
          <Input
            value={minute}
            onChange={e => setMinute(e.target.value) || setFrequency('custom')}
            style={{ width: '20%' }}
          />
          <Input
            value={hour}
            onChange={e => setHour(e.target.value) || setFrequency('custom')}
            style={{ width: '20%' }}
          />
          <Input
            value={day}
            onChange={e => setDay(e.target.value) || setFrequency('custom')}
            style={{ width: '20%' }}
          />
          <Input
            value={month}
            onChange={e => setMonth(e.target.value) || setFrequency('custom')}
            style={{ width: '20%' }}
          />
          <Input
            value={weekday}
            onChange={e => setWeekday(e.target.value) || setFrequency('custom')}
            style={{ width: '20%' }}
          />
        </Input.Group>
        <div className="mt-10 flex items-center justify-between">
          <div>
            <Button.Group>
              <Button onClick={save} type="primary">
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </Button.Group>
          </div>
          <div>
            {job.key && (
              <Button onClick={remove} danger type="primary">
                Delete
              </Button>
            )}
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default CronBuilder;
