using Marten;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class QuestionService(IDocumentSession session) : IQuestionService
    {
        public async Task CreateQuestion(Question question)
        {
            session.Store(question);
            await session.SaveChangesAsync();
        }
    }
}
