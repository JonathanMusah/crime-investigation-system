const QuickActions = () => {
  return (
    <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Quick Actions</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <button className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600'>New Case</button>
        <button className='bg-green-500 text-white p-3 rounded-md hover:bg-green-600'>File Report</button>
        <button className='bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600'>Assign Task</button>
        <button className='bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600'>Schedule Meeting</button>
      </div>
    </div>
  )
}

export default QuickActions
