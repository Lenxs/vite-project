interface PageLoaderProps {
    label?: string
}

const PageLoader = ({
    label = 'Chargement de la page...',
}: PageLoaderProps) => {
    return (
        <div className="page-loader" role="status" aria-live="polite">
            <p>{label}</p>
        </div>
    )
}

export default PageLoader
