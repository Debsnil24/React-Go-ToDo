import ToDoList from "./components/todo-sheet";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
    <div>
        <ToDoList />
    </div>
    </QueryClientProvider>
  )
}

export default App;