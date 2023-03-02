import { getByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", () => {
    test("deve renderizar um título", () => {
        render(<TodoList/>)
        // screen.debug()
        // const title = screen.getByText("Todo List")
        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("deve iniciar com o input vazio", () => {
        render(<TodoList/>)
        // screen.debug()
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })

    test("deve atualizar valor do input ao ser digitado", async () => {
        const user = userEvent.setup()

        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React")

        expect(input).toHaveValue("Revisar React")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla 'enter'", async () => {
        const user = userEvent.setup()

        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const item = screen.getByText("Revisar React")

        // screen.debug()

        expect(input).toHaveValue("")
        expect(item).toBeInTheDocument()
    })

    test("deve alterar o status da tarefa ao pressionar o botão 'toggle'", async () => {
        const user = userEvent.setup()

        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const toggleBtn = screen.getByRole('button', {
            name: /toggle/i
        })

        const item = screen.getByText("Revisar React")


        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")
    })

    test("deve deletar a tarefa ao pressionar o botão 'delete'", async () => {
        const user = userEvent.setup()

        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        })

        const item = screen.queryByText("Revisar React")


        await user.click(deleteBtn)
        expect(item).not.toBeInTheDocument()
    })
})