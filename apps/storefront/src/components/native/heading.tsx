interface HeadingProps {
   title: string
   description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
   return (
      <div className="my-4">
         <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
         <p className="text-lg font-semibold text-muted-foreground">{description}</p>
      </div>
   )
}
