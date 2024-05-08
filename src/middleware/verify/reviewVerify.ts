export class ReviewVerify {
    public validateReviewData(data: any): void {
        if (!data.rating || !data.content) {
            throw new Error("Rating and content are required");
        }
    }
}

export default ReviewVerify;