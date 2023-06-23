
export default function SecLayout({ children }) {
    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                {children}
            </div>
        </section>
    )
}
