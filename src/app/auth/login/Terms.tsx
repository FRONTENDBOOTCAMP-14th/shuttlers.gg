import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import * as styles from './Terms.css';

export default function Terms() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/terms/privacy.md')
      .then((res) => res.text())
      .then((text) => setContent(text));
  });

  return (
    <div className={styles.terms}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
