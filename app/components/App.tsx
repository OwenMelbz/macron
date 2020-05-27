import React, { useEffect, useState } from 'react';
import crontab from 'crontab';
import { v4 } from 'uuid';
import { message, Modal, Spin } from 'antd';
import Placeholder from './Placeholder';
import Sidebar from './Sidebar';
import Editor from './Editor';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [api, setApi] = useState(null);

  const makeJob = (j, key) => ({
    job: j,
    key,
    name: j.comment() || j.render()
  });

  const connect = (selected = null) => {
    crontab.load((err, _api) => {
      if (err) {
        return message.error(err);
      }

      setApi(_api);

      const js = _api.jobs().map(j => makeJob(j, v4()));

      if (selected) {
        const active = js.find(j => j.name === selected.name);
        setJob(active);
      }

      setJobs(js);
      return setLoaded(true);
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
