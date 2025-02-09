import Link from "next/link"

export default function ProjectCard({ project }) {
  const progress = (project.raisedAmount / project.requestedAmount) * 100

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{project.name}</h5>
        <p className="mb-3 font-normal text-gray-700">Requested: {project.requestedAmount} USDC</p>
        <p className="mb-3 font-normal text-gray-700">Raised: {project.raisedAmount} USDC</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <Link
          href={`/project/${project.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
