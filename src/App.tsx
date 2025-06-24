import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRouter } from './router';

export const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
			<Toaster
				richColors
				closeButton
				toastOptions={{
					duration: 5000,
				}}
			/>
		</BrowserRouter>
	);
};
