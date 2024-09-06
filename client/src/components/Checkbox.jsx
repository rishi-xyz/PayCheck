export function Checkbox({id}){
    return (
					<input 
					id={id} 
					aria-describedby="terms" 
					type="checkbox" 
					className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
					required="" />
    );
}