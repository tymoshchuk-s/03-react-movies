import styles from './SearchBar.module.css'
import toast from 'react-hot-toast';

interface SearchBarProps {
    onSearch: (queryValue: string) => void;
}

export let queryValue = '';

export default function SearchBar({onSearch}: SearchBarProps) {
    const handleSubmit = (formData: FormData): void => {
        queryValue = formData.get('query') as string;

if (queryValue.trim() === '') {
            toast('Please enter your search query.', {
                duration: 4000,
                position: 'top-center',
                icon: '⚠️'
            });
    return;
        }

        onSearch(queryValue);
        
        
    };

        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <a
                        className={styles.link}
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by TMDB
                    </a>
                    <form action={handleSubmit} className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            name="query"
                            autoComplete="off"
                            placeholder="Search movies..."
                            autoFocus
                        />
                        <button className={styles.button} type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </header>
        );
    }