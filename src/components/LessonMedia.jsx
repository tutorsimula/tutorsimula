import React from 'react';

const LessonMedia = ({ media }) => (
  <div className="p-4 flex flex-col items-center space-y-4">
    {media.text && <p className="text-gray-700 text-lg">{media.text}</p>}
    {media.image && <img src={media.image} alt="Lesson content" className="max-w-full h-auto rounded shadow-md" />}
    {media.video && (
      <video controls className="max-w-full h-auto rounded shadow-md">
        <source src={media.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
  </div>
);

export default LessonMedia;