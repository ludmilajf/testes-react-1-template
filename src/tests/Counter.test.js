import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from '../components/Counter'

describe("counter", () => {
    test("deve aumenter em 3 o contador quando o botão de incremento for clicado 3 vezes", async () => {
        const user = userEvent.setup()

        render (<Counter />)

        const incrementBtn = screen.getByRole('button', {
            name: /\+/i
        })

        const item = screen.getByText(/0/i)

        // screen.logTestingPlaygroundURL()

        await user.click(incrementBtn)
        await user.click(incrementBtn)
        await user.click(incrementBtn)

        expect(item).toBeInTheDocument("3")
    })
})