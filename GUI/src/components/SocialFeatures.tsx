import React, { useState } from 'react';
import { Share2, Users, MessageSquare, Star, PenTool, ThumbsUp, Bookmark, Flag } from 'lucide-react';

interface SocialFeaturesProps {
  result: any;
  onShare: (result: any) => void;
  onComment: (result: any, comment: string) => void;
  onRate: (result: any, rating: number) => void;
  onAnnotate: (result: any, annotation: string) => void;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({
  result,
  onShare,
  onComment,
  onRate,
  onAnnotate
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newAnnotation, setNewAnnotation] = useState('');
  const [showAnnotation, setShowAnnotation] = useState(false);

  return (
    <div className="glass-effect p-4 rounded-xl space-y-4">
      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onShare(result)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Comments</span>
        </button>
        <button
          onClick={() => setShowAnnotation(!showAnnotation)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-colors"
        >
          <PenTool className="w-5 h-5" />
          <span>Annotate</span>
        </button>
        <button
          onClick={() => onRate(result, 5)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-colors"
        >
          <Star className="w-5 h-5" />
          <span>Rate</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 glass-effect p-2 rounded-lg"
            />
            <button
              onClick={() => {
                onComment(result, newComment);
                setNewComment('');
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Post
            </button>
          </div>
          <div className="space-y-2">
            {result.comments?.map((comment: any, index: number) => (
              <div key={index} className="glass-effect p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p>{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-indigo-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-gray-500 hover:text-indigo-500">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Annotation Section */}
      {showAnnotation && (
        <div className="space-y-4">
          <textarea
            value={newAnnotation}
            onChange={(e) => setNewAnnotation(e.target.value)}
            placeholder="Add your annotation..."
            className="w-full glass-effect p-2 rounded-lg h-32"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAnnotation(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onAnnotate(result, newAnnotation);
                setNewAnnotation('');
                setShowAnnotation(false);
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save Annotation
            </button>
          </div>
        </div>
      )}

      {/* Collaborative Session */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5" />
          <h3 className="font-medium">Collaborative Session</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Start Session
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Join Session
          </button>
        </div>
      </div>

      {/* User Ratings */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5" />
          <h3 className="font-medium">User Ratings</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(result, star)}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {result.ratings?.length || 0} ratings
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialFeatures; 