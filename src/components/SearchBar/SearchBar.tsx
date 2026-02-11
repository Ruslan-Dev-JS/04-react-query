import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [input, setInput] = useState('');
  const handleAction = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim() || '';

    if (!query) {
      toast.error('Please enter a search query');
      return;
    }

    onSubmit(query);
    setInput('');
  };

  return (
    <form
      className={css.form}
      action={(formData: FormData) => handleAction(formData)}
    >
      <input
        type="text"
        name="query"
        className={css.input}
        placeholder="Search movies..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
