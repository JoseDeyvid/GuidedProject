import api from "@/services/api"


const BtnExportTransactions = () => {
    async function handleExport() {
        const response = await api.get(
            '/transactions/export/csv',
            {
                responseType: 'blob'
            }
        )

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        )

        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', 'transactions.csv')

        document.body.appendChild(link)

        link.click()

        link.remove()
    }

    return (
        <button
            onClick={handleExport}
            className="border px-4 py-2"
        >
            Exportar CSV
        </button>
    )
}

export default BtnExportTransactions