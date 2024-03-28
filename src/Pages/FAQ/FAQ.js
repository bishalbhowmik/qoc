import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What is QOC?',
      answer: `QOC (Quorum of Collaborative Learning) is a global online school offering personalized learning, interactive virtual labs, various curriculums like Cambridge, Edexcel, IB, and more. Trusted by parents in Dubai, KSA, Oman, Jordan, Australia, New Zealand, the UK, and beyond, QOC stands out for its commitment to collaborative and quality learning. With diverse batches and personalized tuitions, we nurture well-rounded individuals for a purposeful future. Join us on this engaging educational journey.`,
    },
    {
      question: 'How does an online school work?',
      answer: `Online schooling at QOC is designed to be interactive and engaging. Students can access personalized learning materials, virtual labs, and participate in live classes from anywhere with an internet connection. Our platform provides a seamless learning experience with features such as interactive quizzes, discussion forums, and one-on-one sessions with teachers.`,
    },
    {
      question: 'How to customize my children\'s education?',
      answer: `Customizing your children's education at QOC is a seamless process. Engage in regular discussions with our trained teachers through guardian meetings to understand your child's learning style, strengths, and areas for improvement. Take advantage of our personalized study plan feature, where you can tailor your child's education under the supervision of a psychologist if needed. Participate in one-on-one sessions to address specific concerns and ensure that your child's educational journey aligns with their unique needs and aspirations. With the support of QOC's caring and skilled educators, you have the flexibility to actively shape and personalize your children's education for a fulfilling learning experience.`,
    },
    {
      question: 'Why QOC is different than others?',
      answer: `Discover a unique educational experience at QOC, where trained teachers with a caring nature ensure a personalized approach. Benefit from free demo classes and engage in guardian meetings, online simulations, projects, and Olympiads. Customize your child's study plan under the supervision of a psychologist if needed, identify early career interests, and enjoy skill-focused teaching. QOC fosters comprehensive learning, incorporating a Focus Module to enhance children's attention span. Screen Time Utilization is maximized through curated scientific content from National Geographic, Discovery Channel, and engaging YouTube channels like Veritasium and Numberphile. Join career discussions and explore the wonders of science, all part of QOC's cutting-edge features.`,
    },
    {
      question: 'How does QOC keep parents involved in their child\'s education?',
      answer: `At QOC, we value your involvement. You can discuss and decide learning paths with teachers, join monthly parent meetings, arrange personalized sessions, and trust our strict online safety measures. Our global community of parents actively contributes to creating a supportive and informed environment for your child's educational journey.`,
    },
    {
      question: 'What are the detoxification programs and the focus module mentioned by QOC?',
      answer: `At QOC, we recognize the impact of modernization on children's attention spans. Our detoxification programs aim to address this by implementing a focus module. It involves a reward and daily task system designed to increase their attention span. We provide engaging scientific content from sources like National Geographic, Discovery Channel, and popular YouTube channels such as Veritasium and Numberphile.`,
    },
    {
      question: 'How does QOC plan to spark interest in science and physics?',
      answer: `QOC creates online simulations of different apparatus to provide hands-on experiences. Our goal is to increase interest and curiosity in the world of mysteries, particularly in science and physics. By offering immersive and interactive content, we aim to make learning an exciting journey.`,
    },
    {
      question: 'How can I be sure that QOC\'s initiatives are effective?',
        answer: `QOC encourages parents to check our feedback section where parents from around the world share their experiences. It's a testament to the effectiveness of our programs. The focus module, detoxification programs, and engaging content have proven to enhance attention spans and ignite a genuine interest in various subjects, especially in the fascinating world of science.`,
    },
  {
    question: 'How else does QOC ensure a holistic learning experience for students?',
    answer: `QOC goes beyond traditional learning. We integrate career-related skills, offer global collaborative projects, and provide real-time feedback. Our focus on creating a balanced and engaging environment extends to all aspects of education, ensuring that your child's learning journey is not only enriching academically but also personally and socially.`,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-10 mt-5">Frequently Asked Questions</h1>
      <div className="space-y-4 px-3 md:px-20">
        {faqItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full py-4 px-6 text-left font-semibold focus:outline-none rounded-lg border ${activeIndex === index ? 'border-gray-400' : 'border-gray-200'
                } bg-gray-50 hover:bg-gray-100 transition-colors duration-300`}
            >
              <span className="flex justify-between items-center">
                <span>{item.question}</span>
                <svg
                  className={`w-6 h-6 transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {activeIndex === index && (
              <div className="mt-2 px-6 py-4 bg-white rounded-lg border border-gray-200 shadow-md">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
