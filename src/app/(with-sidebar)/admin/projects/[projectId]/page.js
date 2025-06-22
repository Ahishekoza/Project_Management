export default async function Page({params}) {
    const {projectId} = await params
     return (
        <div>{projectId}</div>
    );
}