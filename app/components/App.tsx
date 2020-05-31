import React, { useEffect, useState } from 'react';
import crontab from 'crontab';
import { v4 } from 'uuid';
import { message, Modal, Spin } from 'antd';
import Placeholder from './Placeholder';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { off, on } from '../utils/events';

window.api = null;

function App() {
  const [loaded, setLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);

  const makeJob = (j, key) => ({
    job: j,
    key,
    name: j.comment() || j.render()
  });

  const connect = (selected = null) => {
    return new Promise((resolve, reject) => {
      crontab.load((err, _api) => {
        if (err) {
          message.error(err);

          return reject(err);
        }

        window.api = _api;

        const js = api.jobs().map(j => makeJob(j, v4()));

        if (selected) {
          const active = js.find(j => j.name === selected.name);
          setJob(active);
        }

        setJobs(js);
        setLoaded(true);

        return resolve(js);
      });
    });
  };

  const onCreate = () => {
    if (job && !job.key) {
      return 'already an unsaved job.';
    }

    const a = api.create('echo "hello world"', '* * * * *', 'hello world');
    const b = makeJob(a, null);
    return setJob(b);
  };

  const onCancel = () => {
    api.reset();
    message.success('Changes cancelled.');
    setJob(null);
    connect();
  };

  const onSave = (j, payload) => {
    const newJob = api.create(
      payload.command,
      [
        payload.minute,
        payload.hour,
        payload.day,
        payload.month,
        payload.weekday
      ].join(' '),
      payload.name
    );

    if (!newJob || !newJob.isValid()) {
      return message.error('Invalid cron syntax');
    }

    api.remove(j.job);

    return api.save(() => {
      const x = makeJob(newJob);
      message.success(`${x.name} saved.`);
      connect(x);
    });
  };

  const onDelete = j => {
    Modal.confirm({
      title: j.name,
      content: `Are you sure you want to delete this job?`,
      onOk() {
        api.remove(j.job);
        api.save(() => {
          setJob(null);
          message.error(`${j.name} deleted.`);
          connect();
        });
      }
    });
  };

  useEffect(() => {
    connect();

    on('touchbar-create', onCreate);

    return () => off('touchbar-create', onCreate);
  }, []);

  return (
    <Spin spinning={!loaded}>
      <div className="flex flex-wrap min-h-screen">
        <nav className="w-1/4">
          <Sidebar onCreate={onCreate} jobs={jobs} onSelect={setJob} />
        </nav>
        <div className="w-3/4">
          {job ? (
            <Editor
              onCancel={onCancel}
              onSave={onSave}
              onDelete={onDelete}
              job={job}
            />
          ) : (
            <Placeholder onCreate={onCreate} />
          )}
        </div>
      </div>
    </Spin>
  );
}

export default App;
