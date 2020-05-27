import React from 'react';
import CronBuilder from './CronBuilder';

function Editor({ job, onCancel, onSave, onDelete }) {
  return (
    <div className="flex flex-col p-8">
      <main className="flex-grow">
        <CronBuilder
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
          job={job}
        />
      </main>
    </div>
  );
}

export default Editor;
